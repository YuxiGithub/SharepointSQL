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
      Accept: "application/json;odata=nometadata",
      "Content-Type": "application/json;odata=nometadata",
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAveXV4aWdsb2JhbDEuc2hhcmVwb2ludC5jb21AODkzNTUxNDYtYWJkNC00NTQ1LTgzYTctMGY3MDhkY2E0Yjc5IiwiaXNzIjoiMDAwMDAwMDEtMDAwMC0wMDAwLWMwMDAtMDAwMDAwMDAwMDAwQDg5MzU1MTQ2LWFiZDQtNDU0NS04M2E3LTBmNzA4ZGNhNGI3OSIsImlhdCI6MTY3MTczMjI3MCwibmJmIjoxNjcxNzMyMjcwLCJleHAiOjE2NzE4MTg5NzAsImlkZW50aXR5cHJvdmlkZXIiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAODkzNTUxNDYtYWJkNC00NTQ1LTgzYTctMGY3MDhkY2E0Yjc5IiwibmFtZWlkIjoiOTY2YzdhMjQtOTczMC00MGE3LWE2NGEtYTc4Nzk2ZjI2NzhjQDg5MzU1MTQ2LWFiZDQtNDU0NS04M2E3LTBmNzA4ZGNhNGI3OSIsIm9pZCI6IjlkMjdkNTE5LWJmMjUtNGZiNS1hM2YyLTQzMDBhZDY2YjkzYyIsInN1YiI6IjlkMjdkNTE5LWJmMjUtNGZiNS1hM2YyLTQzMDBhZDY2YjkzYyIsInRydXN0ZWRmb3JkZWxlZ2F0aW9uIjoiZmFsc2UifQ.hw491qXTFFB7-T2UEOC6fxbZoGaqvhJhjFwyVD2QBtMRwfM5Mjs_9_zex9DKpbCWUA32pUVfwmuoSqOPSUIilMX8D7mMPG-8awoRVpf79hBw5u6n94OWtzTTKkARPPcXO1_SK9VsGo-r7U8Wks7LyzzqqvrDFxGC_q2XnKkUb623Jvzglhv112CCEiwi3dxzXW4zmjoU7qy0WjscicS_cR3RsWJrhnBZ8MziN_JvLkm88XpeHfygq83YsEZuuQAgRsyZJwzk16beXVNVelxyzDV9HFL0Xc4zEQvExr9CsIxLChcUwQ_jaUGTSbfkB5erM8BHAA-cp3Pjb2lxcFm2PQ",
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
            debugger;
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
      "https://yuxiglobal1.sharepoint.com/sites/oss/_api/Web/Lists/getbytitle('SP_SQLSERVER')/Items";
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

              if (xml.feed?.entry) {
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
                debugger;
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
    // body.__metadata = { type: "SP.Data.SP_x005f_SQLSERVERListItem" };
    const url =
      "https://yuxiglobal1.sharepoint.com/sites/oss/_api/Web/Lists/getbytitle('SP_SQLSERVER')/Items";
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
            console.log(response);
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
      "https://yuxiglobal1.sharepoint.com/sites/oss/_api/Web/Lists/getbytitle('SP_SQLSERVER')/Items/getbyid('" +
      selectedItem +
      "')";
    let headers = {
      Accept: "application/json;odate=nometadata",
      "Content-Type": "application/json;odate=nometadata",
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAveXV4aWdsb2JhbDEuc2hhcmVwb2ludC5jb21AODkzNTUxNDYtYWJkNC00NTQ1LTgzYTctMGY3MDhkY2E0Yjc5IiwiaXNzIjoiMDAwMDAwMDEtMDAwMC0wMDAwLWMwMDAtMDAwMDAwMDAwMDAwQDg5MzU1MTQ2LWFiZDQtNDU0NS04M2E3LTBmNzA4ZGNhNGI3OSIsImlhdCI6MTY3MTczMjI3MCwibmJmIjoxNjcxNzMyMjcwLCJleHAiOjE2NzE4MTg5NzAsImlkZW50aXR5cHJvdmlkZXIiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAODkzNTUxNDYtYWJkNC00NTQ1LTgzYTctMGY3MDhkY2E0Yjc5IiwibmFtZWlkIjoiOTY2YzdhMjQtOTczMC00MGE3LWE2NGEtYTc4Nzk2ZjI2NzhjQDg5MzU1MTQ2LWFiZDQtNDU0NS04M2E3LTBmNzA4ZGNhNGI3OSIsIm9pZCI6IjlkMjdkNTE5LWJmMjUtNGZiNS1hM2YyLTQzMDBhZDY2YjkzYyIsInN1YiI6IjlkMjdkNTE5LWJmMjUtNGZiNS1hM2YyLTQzMDBhZDY2YjkzYyIsInRydXN0ZWRmb3JkZWxlZ2F0aW9uIjoiZmFsc2UifQ.hw491qXTFFB7-T2UEOC6fxbZoGaqvhJhjFwyVD2QBtMRwfM5Mjs_9_zex9DKpbCWUA32pUVfwmuoSqOPSUIilMX8D7mMPG-8awoRVpf79hBw5u6n94OWtzTTKkARPPcXO1_SK9VsGo-r7U8Wks7LyzzqqvrDFxGC_q2XnKkUb623Jvzglhv112CCEiwi3dxzXW4zmjoU7qy0WjscicS_cR3RsWJrhnBZ8MziN_JvLkm88XpeHfygq83YsEZuuQAgRsyZJwzk16beXVNVelxyzDV9HFL0Xc4zEQvExr9CsIxLChcUwQ_jaUGTSbfkB5erM8BHAA-cp3Pjb2lxcFm2PQ",
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
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAveXV4aWdsb2JhbDEuc2hhcmVwb2ludC5jb21AODkzNTUxNDYtYWJkNC00NTQ1LTgzYTctMGY3MDhkY2E0Yjc5IiwiaXNzIjoiMDAwMDAwMDEtMDAwMC0wMDAwLWMwMDAtMDAwMDAwMDAwMDAwQDg5MzU1MTQ2LWFiZDQtNDU0NS04M2E3LTBmNzA4ZGNhNGI3OSIsImlhdCI6MTY3MTczMjI3MCwibmJmIjoxNjcxNzMyMjcwLCJleHAiOjE2NzE4MTg5NzAsImlkZW50aXR5cHJvdmlkZXIiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAODkzNTUxNDYtYWJkNC00NTQ1LTgzYTctMGY3MDhkY2E0Yjc5IiwibmFtZWlkIjoiOTY2YzdhMjQtOTczMC00MGE3LWE2NGEtYTc4Nzk2ZjI2NzhjQDg5MzU1MTQ2LWFiZDQtNDU0NS04M2E3LTBmNzA4ZGNhNGI3OSIsIm9pZCI6IjlkMjdkNTE5LWJmMjUtNGZiNS1hM2YyLTQzMDBhZDY2YjkzYyIsInN1YiI6IjlkMjdkNTE5LWJmMjUtNGZiNS1hM2YyLTQzMDBhZDY2YjkzYyIsInRydXN0ZWRmb3JkZWxlZ2F0aW9uIjoiZmFsc2UifQ.hw491qXTFFB7-T2UEOC6fxbZoGaqvhJhjFwyVD2QBtMRwfM5Mjs_9_zex9DKpbCWUA32pUVfwmuoSqOPSUIilMX8D7mMPG-8awoRVpf79hBw5u6n94OWtzTTKkARPPcXO1_SK9VsGo-r7U8Wks7LyzzqqvrDFxGC_q2XnKkUb623Jvzglhv112CCEiwi3dxzXW4zmjoU7qy0WjscicS_cR3RsWJrhnBZ8MziN_JvLkm88XpeHfygq83YsEZuuQAgRsyZJwzk16beXVNVelxyzDV9HFL0Xc4zEQvExr9CsIxLChcUwQ_jaUGTSbfkB5erM8BHAA-cp3Pjb2lxcFm2PQ",
      "If-Match": "*",
    });
    const url =
      "https://yuxiglobal1.sharepoint.com/sites/oss/_api/Web/Lists/getbytitle('SP_SQLSERVER')/Items/getbyid('" +
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
      "https://yuxiglobal1.sharepoint.com/sites/oss/_api/Web/Lists/getbytitle('SP_SQLSERVER')/Items";
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
                this.DeleteListItem(Number(r.ClientId)).then((response) => {
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
