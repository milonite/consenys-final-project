import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Pollock from "../Arts/okazz_pollock/OkazzPollock";
import Blankets from "../Arts/kgolid_blankets/KGolidBlankets";

export interface SimpleDialogProps {
  open: boolean;
  selected: {
    art: string | null;
    tokenId: string | null;
  };
  handleClose: () => void;
}

const getArt = (selected: any) => {
  try {
    if (selected.art === "Pollock") {
      return <Pollock entropy={selected.tokenId}></Pollock>;
    } else {
      return <Blankets entropy={selected.tokenId}></Blankets>;
    }
  } catch (error) {
    return <></>;
  }
};

function SimpleDialog({ open, selected, handleClose }: SimpleDialogProps) {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      {getArt(selected)}
    </Dialog>
  );
}

export default SimpleDialog;
