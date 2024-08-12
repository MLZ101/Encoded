using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class CourseProgress
{
    public int ProgressId { get; set; }

    public int? EnrollmentId { get; set; }

    public int? CompletedModules { get; set; }

    public int? TotalModules { get; set; }

    public decimal? Grade { get; set; }

    public virtual Enrollment? Enrollment { get; set; }
}
