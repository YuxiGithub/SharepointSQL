using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ReactCRUDAPI.Models;

namespace ReactCRUDAPI.Controllers
{
    public class SowsController : Controller
    {
        private YUXI_OSS_DEV_Entities db = new YUXI_OSS_DEV_Entities();

        // GET: Sows
        public ActionResult Index()
        {
            return View(db.Sows.ToList());
        }

        // GET: Sows/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Sow sow = db.Sows.Find(id);
            if (sow == null)
            {
                return HttpNotFound();
            }
            return View(sow);
        }

        // GET: Sows/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Sows/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "SowId,ProjectId,StartDate,EndDate,Budget")] Sow sow)
        {
            if (ModelState.IsValid)
            {
                if (sow is IControllerHooks) { 
                    ((IControllerHooks)sow).OnCreate(); 
                }
                db.Sows.Add(sow);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(sow);
        }

        // GET: Sows/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Sow sow = db.Sows.Find(id);
            if (sow == null)
            {
                return HttpNotFound();
            }
            return View(sow);
        }

        // POST: Sows/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "SowId,ProjectId,StartDate,EndDate,Budget")] Sow sow)
        {
            if (ModelState.IsValid)
            {
                if (sow is IControllerHooks) { 
                    ((IControllerHooks)sow).OnEdit(); 
                }
                db.Entry(sow).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(sow);
        }

        // GET: Sows/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Sow sow = db.Sows.Find(id);
            if (sow == null)
            {
                return HttpNotFound();
            }
            return View(sow);
        }

        // POST: Sows/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Sow sow = db.Sows.Find(id);
            db.Sows.Remove(sow);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
