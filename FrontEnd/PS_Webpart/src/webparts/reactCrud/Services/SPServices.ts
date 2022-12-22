/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-void */
/* eslint-disable no-async-promise-executor */
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { XMLParser } from "fast-xml-parser";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { IDropdownOption } from "office-ui-fabric-react";
import { ClientRow } from "./Common";

export class SPOperations {
  public getHeader(): HeadersInit {
    return {
      Accept: "application/json;odate=nometadata",
      "Content-Type": "application/json;odate=nometadata",
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAveXV4aWdsb2JhbDEuc2hhcmVwb2ludC5jb21AODkzNTUxNDYtYWJkNC00NTQ1LTgzYTctMGY3MDhkY2E0Yjc5IiwiaXNzIjoiMDAwMDAwMDEtMDAwMC0wMDAwLWMwMDAtMDAwMDAwMDAwMDAwQDg5MzU1MTQ2LWFiZDQtNDU0NS04M2E3LTBmNzA4ZGNhNGI3OSIsImlhdCI6MTY3MTcyNzg5NSwibmJmIjoxNjcxNzI3ODk1LCJleHAiOjE2NzE4MTQ1OTUsImlkZW50aXR5cHJvdmlkZXIiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAODkzNTUxNDYtYWJkNC00NTQ1LTgzYTctMGY3MDhkY2E0Yjc5IiwibmFtZWlkIjoiOTY2YzdhMjQtOTczMC00MGE3LWE2NGEtYTc4Nzk2ZjI2NzhjQDg5MzU1MTQ2LWFiZDQtNDU0NS04M2E3LTBmNzA4ZGNhNGI3OSIsIm9pZCI6IjlkMjdkNTE5LWJmMjUtNGZiNS1hM2YyLTQzMDBhZDY2YjkzYyIsInN1YiI6IjlkMjdkNTE5LWJmMjUtNGZiNS1hM2YyLTQzMDBhZDY2YjkzYyIsInRydXN0ZWRmb3JkZWxlZ2F0aW9uIjoiZmFsc2UifQ.AErUaJcSMzR8RziQAwCcZ93R7KtG6mrDv_hRy9PeVA807fkVsuQfAQn1pF6hbrT7TqUfq-7BFgPnet2Zp6y-AdmZO25HzETFFl4D9DwAz7D2NA0ps_JcPbJfs40J-nr_hrWZAsM7iPwYS863k05ylc9gPS3iQv_y6Wd9UTbqhDK-JEZJcd2qKOXGsT8IoT57XzkCSCGiFIwU4-O2SugyZOrb3G8UUNhBKkACQY1Mru2Sy5DsBPi6MOt9M0gy4HUrvMNuIKfT7L_p2mbMNUATluYYnNJshtbkw3aY9773ySecXQyPsnNPWiz_3_48td5r-OBf7OKBkB-qYmNm6nMueg",
      token_type: "Bearer",
      "If-Match": "*",
    };
  }

  public GetAllList(context: WebPartContext): Promise<IDropdownOption[]> {
    let restApiUrl: string =
      context.pageContext.web.absoluteUrl +
      "/sites/oss/_api/Web/Lists?select=Title";
    let listTitles: IDropdownOption[] = [];
    return new Promise<IDropdownOption[]>(async (resolve, reject) => {
      void context.spHttpClient
        .get(restApiUrl, SPHttpClient.configurations.v1)
        .then(
          (response: SPHttpClientResponse) => {
            void response.json().then((results: any) => {
              results["value"].map((result: any) => {
                listTitles.push({
                  key: result.Title,
                  text: result.Title,
                });
              });
              console.log(listTitles);
            });
            resolve(listTitles);
          },
          (error: any): void => {
            reject("error ocurred " + error);
          }
        );
    });
  }

  public RetrieveListItems(): Promise<ClientRow[]> {
    const url =
      "https://yuxiglobal1.sharepoint.com/sites/oss/Lists/getbytitle('SP_SQLSERVER')/Items";
    return new Promise<ClientRow[]>(async (resolve, reject) => {
      await fetch(url, {
        method: "GET",
        headers: this.getHeader(),
      })
        .then((response) => {
          if (response.status === 200) {
            response.text().then((data) => {
              const xml = new XMLParser().parse(data);
              let rows: ClientRow[] = [];

              if (xml.feed.entry) {
                if (Array.isArray(xml.feed.entry)) {
                  xml.feed.entry.forEach((item: any) => {
                    rows.push({
                      Name: item.content["m:properties"]["d:Name"],
                      ClientId: item.content["m:properties"]["d:ClientId"],
                      Tactical_Contact:
                        item.content["m:properties"]["d:Tactical_Contact"],
                      Operative_Contact:
                        item.content["m:properties"]["d:Operative_Contact"],
                      Strategic_Contact:
                        item.content["m:properties"]["d:Strategic_Contact"],
                      Address: item.content["m:properties"]["d:Address"],
                      Country: item.content["m:properties"]["d:Country"],
                    });
                  });
                } else {
                  const item = xml.feed.entry;
                  rows.push({
                    Name: item.content["m:properties"]["d:Name"],
                    ClientId: item.content["m:properties"]["d:ClientId"],
                    Tactical_Contact:
                      item.content["m:properties"]["d:Tactical_Contact"],
                    Operative_Contact:
                      item.content["m:properties"]["d:Operative_Contact"],
                    Strategic_Contact:
                      item.content["m:properties"]["d:Strategic_Contact"],
                    Address: item.content["m:properties"]["d:Address"],
                    Country: item.content["m:properties"]["d:Country"],
                  });
                }
                resolve(rows);
              }
            });
          } else {
            console.log("Error");
          }
        })
        .catch((err) => {
          alert(err);
        });
    });
  }

  public CreateListItem(body: ClientRow): Promise<string> {
    debugger;
    const url =
      "https://yuxiglobal1.sharepoint.com/sites/oss/Lists/getbytitle('SP_SQLSERVER')/Items";
    return new Promise<string>(async (resolve, reject) => {
      await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: this.getHeader(),
      })
        .then((response) => {
          debugger;
          if (response.status === 201) {
            resolve("Created");
          } else {
            reject("Error");
          }
        })
        .catch((err) => {
          alert(err);
        });
    });
  }

  public UpdateListItem(
    selectedItem: number,
    body: ClientRow
  ): Promise<string> {
    const url =
      "https://yuxiglobal1.sharepoint.com/sites/oss/Lists/getbytitle('SP_SQLSERVER')/Items/getbyid('" +
      selectedItem +
      "')";
    let headers = {
      Accept: "application/json;odate=nometadata",
      "Content-Type": "application/json;odate=nometadata",
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAveXV4aWdsb2JhbDEuc2hhcmVwb2ludC5jb21AODkzNTUxNDYtYWJkNC00NTQ1LTgzYTctMGY3MDhkY2E0Yjc5IiwiaXNzIjoiMDAwMDAwMDEtMDAwMC0wMDAwLWMwMDAtMDAwMDAwMDAwMDAwQDg5MzU1MTQ2LWFiZDQtNDU0NS04M2E3LTBmNzA4ZGNhNGI3OSIsImlhdCI6MTY3MTcyNzg5NSwibmJmIjoxNjcxNzI3ODk1LCJleHAiOjE2NzE4MTQ1OTUsImlkZW50aXR5cHJvdmlkZXIiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAODkzNTUxNDYtYWJkNC00NTQ1LTgzYTctMGY3MDhkY2E0Yjc5IiwibmFtZWlkIjoiOTY2YzdhMjQtOTczMC00MGE3LWE2NGEtYTc4Nzk2ZjI2NzhjQDg5MzU1MTQ2LWFiZDQtNDU0NS04M2E3LTBmNzA4ZGNhNGI3OSIsIm9pZCI6IjlkMjdkNTE5LWJmMjUtNGZiNS1hM2YyLTQzMDBhZDY2YjkzYyIsInN1YiI6IjlkMjdkNTE5LWJmMjUtNGZiNS1hM2YyLTQzMDBhZDY2YjkzYyIsInRydXN0ZWRmb3JkZWxlZ2F0aW9uIjoiZmFsc2UifQ.AErUaJcSMzR8RziQAwCcZ93R7KtG6mrDv_hRy9PeVA807fkVsuQfAQn1pF6hbrT7TqUfq-7BFgPnet2Zp6y-AdmZO25HzETFFl4D9DwAz7D2NA0ps_JcPbJfs40J-nr_hrWZAsM7iPwYS863k05ylc9gPS3iQv_y6Wd9UTbqhDK-JEZJcd2qKOXGsT8IoT57XzkCSCGiFIwU4-O2SugyZOrb3G8UUNhBKkACQY1Mru2Sy5DsBPi6MOt9M0gy4HUrvMNuIKfT7L_p2mbMNUATluYYnNJshtbkw3aY9773ySecXQyPsnNPWiz_3_48td5r-OBf7OKBkB-qYmNm6nMueg",
      token_type: "Bearer",
      "If-Match": "*",
      "X-HTTP-Method": "MERGE",
    };
    return new Promise<string>(async (resolve, reject) => {
      await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: headers,
      })
        .then((response) => {
          resolve("Updated");
        })
        .catch((err) => {
          alert(err);
        });
    });
  }

  public DeleteListItem(selectedItem: number): Promise<string> {
    let params = new URLSearchParams({
      Accept: "application/json;odate=verbose",
      "Content-Type": "application/json;odata=verbose",
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAveXV4aWdsb2JhbDEuc2hhcmVwb2ludC5jb21AODkzNTUxNDYtYWJkNC00NTQ1LTgzYTctMGY3MDhkY2E0Yjc5IiwiaXNzIjoiMDAwMDAwMDEtMDAwMC0wMDAwLWMwMDAtMDAwMDAwMDAwMDAwQDg5MzU1MTQ2LWFiZDQtNDU0NS04M2E3LTBmNzA4ZGNhNGI3OSIsImlhdCI6MTY3MTcyNzg5NSwibmJmIjoxNjcxNzI3ODk1LCJleHAiOjE2NzE4MTQ1OTUsImlkZW50aXR5cHJvdmlkZXIiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAODkzNTUxNDYtYWJkNC00NTQ1LTgzYTctMGY3MDhkY2E0Yjc5IiwibmFtZWlkIjoiOTY2YzdhMjQtOTczMC00MGE3LWE2NGEtYTc4Nzk2ZjI2NzhjQDg5MzU1MTQ2LWFiZDQtNDU0NS04M2E3LTBmNzA4ZGNhNGI3OSIsIm9pZCI6IjlkMjdkNTE5LWJmMjUtNGZiNS1hM2YyLTQzMDBhZDY2YjkzYyIsInN1YiI6IjlkMjdkNTE5LWJmMjUtNGZiNS1hM2YyLTQzMDBhZDY2YjkzYyIsInRydXN0ZWRmb3JkZWxlZ2F0aW9uIjoiZmFsc2UifQ.AErUaJcSMzR8RziQAwCcZ93R7KtG6mrDv_hRy9PeVA807fkVsuQfAQn1pF6hbrT7TqUfq-7BFgPnet2Zp6y-AdmZO25HzETFFl4D9DwAz7D2NA0ps_JcPbJfs40J-nr_hrWZAsM7iPwYS863k05ylc9gPS3iQv_y6Wd9UTbqhDK-JEZJcd2qKOXGsT8IoT57XzkCSCGiFIwU4-O2SugyZOrb3G8UUNhBKkACQY1Mru2Sy5DsBPi6MOt9M0gy4HUrvMNuIKfT7L_p2mbMNUATluYYnNJshtbkw3aY9773ySecXQyPsnNPWiz_3_48td5r-OBf7OKBkB-qYmNm6nMueg",
      "If-Match": "*",
    });
    const url =
      "https://yuxiglobal1.sharepoint.com/sites/oss/Lists/getbytitle('SP_SQLSERVER')/Items/getbyid('" +
      selectedItem +
      "')?" +
      params;
    return new Promise<string>(async (resolve, reject) => {
      await fetch(url, {
        method: "DELETE",
        headers: this.getHeader(),
      })
        .then((response) => {
          resolve("Deleted");
        })
        .catch((err) => {
          alert(err);
          reject("Deleted");
        });
    });
  }

  public ClearList(): Promise<string> {
    const url =
      "https://yuxiglobal1.sharepoint.com/sites/oss/Lists/getbytitle('SP_SQLSERVER')/Items";
    return new Promise<string>(async (resolve, reject) => {
      await fetch(url, {
        method: "GET",
        headers: this.getHeader(),
      })
        .then((response) => {
          if (response.status === 200) {
            response.text().then((data) => {
              const xml = new XMLParser().parse(data);
              let rows: ClientRow[] = [];
              xml.feed.entry.forEach((item: any) => {
                rows.push({
                  Name: item.content["m:properties"]["d:Name"],
                  ClientId: item.content["m:properties"]["d:ClientId"],
                  Tactical_Contact:
                    item.content["m:properties"]["d:Tactical_Contact"],
                  Operative_Contact:
                    item.content["m:properties"]["d:Operative_Contact"],
                  Strategic_Contact:
                    item.content["m:properties"]["d:Strategic_Contact"],
                  Address: item.content["m:properties"]["d:Address"],
                  Country: item.content["m:properties"]["d:Country"],
                });
              });
              rows.forEach((r) => {
                this.DeleteListItem(r.ClientId).then((response) => {
                  console.log(response);
                });
              });
              resolve("Clear");
            });
          } else {
            alert("Error");
          }
        })
        .catch((err) => {
          alert(err);
        });
    });
  }
}
