//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ReactCRUDAPI.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Sow
    {
        public int SowId { get; set; }
        public int ProjectId { get; set; }
        public System.DateTime StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public double Budget { get; set; }
        public string Description { get; set; }
    }
}
