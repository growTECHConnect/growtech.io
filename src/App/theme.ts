import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            root: { textTransform: 'none' },
        },
        MuiTableCell: {
            head: { fontWeight: 600 },
        },
    },
    palette: {
        primary: { main: '#bbd537', dark: '#bbd537' },
    },
});

export default theme;
