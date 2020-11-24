import React from "react";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { useArtPieceOne } from "../hooks/useContract";

function Buy() {
  const contract = useArtPieceOne();
  return (
    <div>
      <Typography>Hello</Typography>
      <Button color="primary" variant="contained">
        CREATE TOKEN
      </Button>{" "}
    </div>
  );
}

export default Buy;
