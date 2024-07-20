using System.ComponentModel.DataAnnotations.Schema;

namespace KONSUME.Core.Domain.Entities
{
    public class UserInteraction :Auditables
        {
            public string Question { get; set; }
            public string Response { get; set; }
        }

}
