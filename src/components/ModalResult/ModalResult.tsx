import { Modal, Result } from "antd";
import React from "react";

type ModalResultProps = {
  onOk: () => void;
  onCancel?: () => void;
  open: boolean;
  status?: "success" | "info" | "error";
  title?: string;
  subTitle?: string;
  hideCancel?: boolean;
};
const ModalResult = ({
  onOk,
  onCancel = () => null,
  open,
  status = "success",
  title = "Berhasil menambahkan data",
  subTitle = "Data berhasil ditambahkan ke basis data",
  hideCancel = true,
}: ModalResultProps) => {
  return (
    <Modal
      open={open}
      closable={false}
      cancelButtonProps={hideCancel ? ({ style: { display: "none" } }) : { style: { display: "inline" } }}
      onOk={onOk} onCancel={onCancel}
    >
      <Result status={status} title={title} subTitle={subTitle} />
    </Modal>
  );
};

export default ModalResult;