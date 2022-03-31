import React from "react";
import "./InventoryModal.scss";
import Close from "../../assets/icons/close-24px.svg";
import axios from "axios";
import { DELETE_INVENTORY_API_URL } from "../../api/endpoints";

const InventoryModal = ({ closeModal, inventoryName, inventoryId }) => {
  const handleDelete = (id) => {
    axios
      .delete(DELETE_INVENTORY_API_URL(id))
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
        alert("something went wrong");
      });
    closeModal(false);
    window.location.reload(true);
  };

  return (
    <div className="inventory-modal">
      <div className="modal__content-container">
        <div className="button__x-container">
          <button className="button__x" onClick={() => closeModal(false)}>
            <img src={Close} alt="" />
          </button>
        </div>
        <div className="modal__header">
          <div className="modal__title">
            {`
            Delete ${inventoryName} from inventory list?`}
          </div>
        </div>
        <div className="modal__content">
          <div className="modal__body">
            <span>Please confirm that you'd like to delete the </span>
            {inventoryName}
            <span>
              {" "}
              from the list of inventory. You wont be able to undo this action.
            </span>
          </div>
          <div className="modal__footer">
            <button
              className="button button__cancel"
              onClick={() => closeModal(false)}
            >
              Cancel
            </button>
            <button
              className="button button__delete"
              onClick={() => handleDelete(inventoryId)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryModal;
