import React from "react";
import clsx from "clsx";
import { withStyles, withTheme } from "@material-ui/core/styles";
import text from "../../data";


import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from "@material-ui/core";

export default function ScrollDialog(props) {
    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
            descriptionElement.focus();
        }
    }, [props.open]);

    return (
        <Dialog fullWidth={true} maxWidth={"lg"} open={props.open} onClose={props.onClose} scroll="paper" aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
            <DialogTitle id="scroll-dialog-title">{props.article}</DialogTitle>
            <DialogContent dividers={true}>
                <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
                    <div dangerouslySetInnerHTML={{ __html: props.html }} />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">
                    {text().article.close}
                </Button>
            </DialogActions>
        </Dialog>
    );
}