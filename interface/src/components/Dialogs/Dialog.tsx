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

function SimpleDialog({ open, selected, handleClose }: SimpleDialogProps) {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      {selected.art === "Pollock" ? (
        <Pollock entropy={selected.tokenId}></Pollock>
      ) : (
        <Blankets entropy={selected.tokenId}></Blankets>
      )}
    </Dialog>
  );
}

export default SimpleDialog;
