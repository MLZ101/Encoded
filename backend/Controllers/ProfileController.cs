using backend.Models;
using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : Controller
    {
        private readonly AppDbContext _context;
        public ProfileController(AppDbContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View();
        }


        [HttpGet("{instructor_id}/instr-courses")]
        public async Task<IActionResult> GetInstructorCourses(int instructor_id)
        {
            var courses = await _context.Courses
            .Where(c => c.InstructorId == instructor_id)
            .Select(c => c.CourseName)
            .ToListAsync();

            return Ok(courses);
        }

        [HttpGet("{student_id}/st-courses")]
        public async Task<IActionResult> GetStudentCourses(int student_id)
        {
            var courses = await _context.Enrollments
            .Where(e => e.UserId == student_id)
            .Join (_context.Courses, e1 => e1.CourseId, c => c.CourseId,
            (e1,c) => c.CourseName)
            .ToListAsync();

            return Ok(courses);
        }

    }
}



