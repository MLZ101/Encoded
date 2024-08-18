using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly string _jwtKey;
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _jwtKey = configuration["Jwt:Key"];
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (ModelState.IsValid)
            {
                if (await _context.Users.AnyAsync(u => u.Email == user.Email))
                {
                    return BadRequest(new { message = "Email already exists." });
                }

                var (salt, hash) = HashPassword(user.PasswordHash);
                user.PasswordHash = salt + hash;

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return Ok("User registered successfully.");
            }

            return BadRequest(ModelState);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            if (ModelState.IsValid)
            {
                var existingUser = await _context.Users
                    .SingleOrDefaultAsync(u => u.Email == user.Email);

                if (existingUser == null || !VerifyPassword(user.PasswordHash, existingUser.PasswordHash))
                {
                    return Unauthorized(new { message = "Invalid email or password." });
                }
                var token = GenerateJwtToken(existingUser);

                return Ok(new { Token = token, message = "Login Successful!", userId = existingUser.UserId, userName = existingUser.UserName, email = existingUser.Email, role = existingUser.Role });

            }

            return BadRequest(ModelState);
        }

        private (string, string) HashPassword(string password)
        {
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            string saltBase64 = Convert.ToBase64String(salt);
            string hashBase64 = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            return (saltBase64, hashBase64);
        }

        private bool VerifyPassword(string enteredPassword, string storedPasswordHash)
        {
            string saltBase64 = storedPasswordHash.Substring(0, 24);
            string storedHashBase64 = storedPasswordHash.Substring(24);

            byte[] salt = Convert.FromBase64String(saltBase64);

            string enteredHashBase64 = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: enteredPassword,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            return enteredHashBase64 == storedHashBase64;
        }


        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "YourApp",
                audience: "YourApp",
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


    }
}
