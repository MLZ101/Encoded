using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Enrollment
{
    public int EnrollmentId { get; set; }

    public int? UserId { get; set; }

    public int? CourseId { get; set; }

    public DateTime? EnrolledAt { get; set; }

    public virtual Course? Course { get; set; }

    public virtual ICollection<CourseProgress> CourseProgresses { get; set; } = new List<CourseProgress>();

    public virtual User? User { get; set; }
}
