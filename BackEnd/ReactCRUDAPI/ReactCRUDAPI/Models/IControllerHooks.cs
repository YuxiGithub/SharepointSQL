using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ReactCRUDAPI.Models
{    public interface IControllerHooks
    {
        void OnCreate();
        void OnEdit();
    }
}