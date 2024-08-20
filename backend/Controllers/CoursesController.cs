using Microsoft.AspNetCore.Mvc;
using backend.Data;
using Microsoft.EntityFrameworkCore;
using backend.DTO;
using System.Threading.Tasks;
using System.Linq;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : Controller
    {

        private readonly AppDbContext _context;

        public CoursesController(AppDbContext context)
        {
            _context = context;
        }

        // Existing endpoint to get all courses
        [HttpGet]
        public async Task<IActionResult> GetCourses()
        {
            var courses = await _context.Courses.ToListAsync();
            return Ok(courses);
        }

        // New endpoint to get courses with instructor names
        [HttpGet("with-instructors")]
        public async Task<IActionResult> GetCoursesWithInstructors()
        {
            var query = from course in _context.Courses
                        join user in _context.Users
                        on course.InstructorId equals user.UserId
                        select new CoursesWithInstructors
                        {
                            Id = course.CourseId,
                            CourseName = course.CourseName,
                            Description = course.Description,
                            InstructorName = user.UserName
                            // Include other fields from the Courses table as needed
                        };

            var coursesWithInstructors = await query.ToListAsync();

            return Ok(coursesWithInstructors);
        }
    }
}
