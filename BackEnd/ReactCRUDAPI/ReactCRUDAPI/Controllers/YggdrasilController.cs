using ReactCRUDAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ReactCRUDAPI.Controllers
{
    [RoutePrefix("Api/Client")]
    public class YggdrasilController : ApiController
    {
        YUXI_OSS_DEV_Entities objEntity = new YUXI_OSS_DEV_Entities();

        [HttpGet]
        [Route("GetClientsDetails")]
        public IQueryable<Client> GetClientsDetails()
        {
            try
            {
                return objEntity.Clients;
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("GetClientDetailsById/{clientId}")]
        public IHttpActionResult GetClientById(int clientId)
        {
            Client objClient = new Client();
            int Id = Convert.ToInt32(clientId);
            try
            {
                objClient = objEntity.Clients.First(c => c.ClientId == clientId);
                if (objClient == null)
                {
                    return NotFound();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return Ok(objClient);
        }

        [HttpPost]
        [Route("InsertClientDetails")]
        public IHttpActionResult PostClient([FromBody] Client data)
        {
             string url2 = Request.RequestUri.ToString();

            string message = "";
            if (data != null)
            {

                try
                {
                    objEntity.Clients.Add(data);
                    int result = objEntity.SaveChanges();
                    if (result > 0)
                    {
                        message = "Client has been sucessfully added";
                    }
                    else
                    {
                        message = "faild";
                    }
                }
                catch (Exception)
                {
                    throw;
                }
            }

            return Ok(message);
        }

        [HttpPut]
        [Route("UpdateClientDetails")]
        public IHttpActionResult PutClientMaster([FromBody] Client client)
        {
            string message = "";
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                Client objClient = new Client();
                objClient = objEntity.Clients.First(c => c.UniqueId == client.UniqueId);
                if (objClient != null)
                {
                    objClient.Name = client.Name;
                    objClient.ClientId = client.ClientId;
                    objClient.Tactical_Contact = client.Tactical_Contact;
                    objClient.Operative_Contact = client.Operative_Contact;
                    objClient.Strategic_Contact = client.Strategic_Contact;
                    objClient.Address = client.Address;
                    objClient.Country = client.Country;


                }

                int result = objEntity.SaveChanges();
                if (result > 0)
                {
                    message = "Client has been sussfully updated";
                }
                else
                {
                    message = "faild";
                }

            }
            catch (Exception)
            {
                throw;
            }

            return Ok(message);
        }

        [HttpDelete]
        [Route("DeleteClientDetails/{id}")]
        public IHttpActionResult DeleteClientDetails(int id)
        {
            string message = "";
            Client client = objEntity.Clients.First(c => c.ClientId == id);
            if (client == null)
            {
                return NotFound();
            }

            objEntity.Clients.Remove(client);
            int result = objEntity.SaveChanges();
            if (result > 0)
            {
                message = "Client has been sussessfully deleted";
            }
            else
            {
                message = "faild";
            }

            return Ok(message);
        }
    }
}
