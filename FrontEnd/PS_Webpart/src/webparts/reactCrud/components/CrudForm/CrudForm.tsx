import * as React from "react";
import { ClientRow } from "../../Services/Common";
import { ICrudFormProps } from "./ICrudFormProps";
import { ICrudFormState } from "./ICrudFormState";
import styles from "../ReactCrud.module.scss";
import { ActionButton } from "office-ui-fabric-react";

class CrudForm extends React.Component<ICrudFormProps, ICrudFormState, {}> {
  constructor(props: ICrudFormProps) {
    super(props);
    this.state = props;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange(event: any) {
    
    const target = event.target;
    this.setState({ form: target.form });
  }

  getInputValue(index: number): string {
    
    if (this.state.form) {
      return this.state.form[index].value ? this.state.form[index].value : "";
    }
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  handleSubmit(event: any) {
    
    let clientRow: ClientRow = {
      Name: this.state.form[0].value,
      Tactical_Contact: this.state.form[1].value,
      Operative_Contact: this.state.form[2].value,
      Strategic_Contact: this.state.form[3].value,
      Address: this.state.form[4].value,
      Country: this.state.form[5].value,
    };
    if (this.props.clientRow) {
      clientRow.ClientId = this.props.clientRow?.ClientId;
      this.props.onUpdateClick(clientRow);
    } else {
      clientRow.ClientId = this.getRandomInt(this.props.rowLength + 20, 99999);
      this.props.onAddClick(clientRow);
    }

    this.props.onSectionChange("List");
    event.preventDefault();
  }

  handleCancel(event: any) {
    
    this.props.onSectionChange("List");
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className={`${styles.myStyles}`}>
          <div>
            <div>
              <label className={`${styles.myLabel}`}>Name:</label>
            </div>
            <div>
              <input
                name="name"
                type="text"
                className={styles.myInput}
                value={this.getInputValue(0)}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div>
            <div>
              <label className={`${styles.myLabel}`}>Tactical_Contact:</label>
            </div>
            <div>
              <input
                name="name"
                type="text"
                className={styles.myInput}
                value={this.getInputValue(1)}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div>
            <div>
              <label className={`${styles.myLabel}`}>Operative_Contact:</label>
            </div>
            <div>
              <input
                name="name"
                type="text"
                className={styles.myInput}
                value={this.getInputValue(2)}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div>
            <div>
              <label className={`${styles.myLabel}`}>Strategic_Contact:</label>
            </div>
            <div>
              <input
                name="name"
                type="text"
                className={styles.myInput}
                value={this.getInputValue(3)}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div>
            <div>
              <label className={`${styles.myLabel}`}>Address:</label>
            </div>
            <div>
              <input
                name="name"
                type="text"
                className={styles.myInput}
                value={this.getInputValue(4)}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div>
            <div>
              <label className={`${styles.myLabel}`}>Country:</label>
            </div>
            <div>
              <input
                name="name"
                type="text"
                className={styles.myInput}
                value={this.getInputValue(5)}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="row">
              {this.props.clientRow && (
                <ActionButton
                  text="Update"
                  className={`col ${styles.myButton}`}
                  onClick={this.handleSubmit}
                ></ActionButton>
              )}

              {this.props.clientRow === undefined && (
                <ActionButton
                  text="Add"
                  className={`col ${styles.myButton}`}
                  onClick={this.handleSubmit}
                ></ActionButton>
              )}
              <ActionButton
                text="Cancel"
                className={`col ${styles.myButton}`}
                onClick={this.handleCancel}
              ></ActionButton>
            
          </div>
        </form>
      </div>
    );
  }
}

export default CrudForm;
