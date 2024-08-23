using System.ComponentModel.DataAnnotations.Schema;

namespace KONSUME.Core.Domain.Entities
{
    public class UserInteraction :Auditables
    {
        public int UserId { get; set; }
        public virtual User User { get; set; } = default!;
        public string Question { get; set; }
        public string Response { get; set; }
    }

}
