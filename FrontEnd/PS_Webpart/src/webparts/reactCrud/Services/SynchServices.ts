import { SQLServerOperations } from "./SQLServerServices";
import { SPOperations } from "./SPServices";
import { ClientRow } from "./Common";

export class SynchServices {
  private _sp: SPOperations;
  private _sql: SQLServerOperations;

  public async clearAndSynch(): Promise<void> {
    this._sp = new SPOperations();
    this._sql = new SQLServerOperations();

    void this._sp.RetrieveListItems().then((data: ClientRow[]) => {
        
        if (data.length > 0) {
            data.forEach((client: ClientRow) => {
                void this._sp.DeleteListItem(Number(client.ClientId)).then(() => {
                    console.log(`${client.ClientId} removed`);
                })
            });
        }
        void this._sql.getAllItems().then((data: ClientRow[]) => {
            
            if (data.length > 0) {
                debugger;
                data.forEach((client: ClientRow) => {
                    void this._sp.CreateListItem(client).then(() => {
                        console.log(`${client.ClientId} created in SP`);
                    })
                })
            }
        }); 
    });
  }
}
