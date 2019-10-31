import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            root: { textTransform: 'none', borderRadius: 0, fontWeight: 600 },
            outlined: { borderWidth: 2 },
            outlinedPrimary: { borderWidth: 2 },
            outlinedSecondary: {
                color: '#ffffff',
                borderColor: '#ef864c',
                backgroundColor: '#ef864c',
                '&:hover': {
                    borderColor: '#bbd537',
                    backgroundColor: '#bbd537',
                },
            },
        },
        MuiButtonBase: {
            disabled: {
                color: 'red',
            },
        },
        MuiTableCell: {
            head: { fontWeight: 600 },
        },
        MuiOutlinedInput: {
            notchedOutline: { borderRadius: 0 },
        },
    },
    palette: {
        primary: { main: '#bbd537', dark: '#bbd537' },
        secondary: { main: '#ef864c' },
    },
});

export default theme;
