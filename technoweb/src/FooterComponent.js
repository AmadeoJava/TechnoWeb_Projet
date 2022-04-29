import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

export default function FooterComponent() {
  return (
    <footer>
      <Box
        bgcolor="text.secondary"
        color="white"
      >
        <Container maxWidth="lg">
          <Box  style={{display:'flex', textAlign:'center', marginLeft:'auto', marginRight:'auto'}}>
              <Box style={{ paddingRight:'10%'}}>
              <Box borderBottom={1}>Help</Box>
              <Box>
                <Link href="/" color="inherit">
                  Contact
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Support
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Privacy
                </Link>
              </Box>
            </Box>
            <Box style={{paddingRight:'10%'}}>
              <Box borderBottom={1}>Account</Box>
              <Box>
                <Link href="/" color="inherit">
                  Login
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Register
                </Link>
              </Box>
            </Box>
            <Box>
              <Box borderBottom={1} >Messages</Box>
              <Box>
                <Link href="/" color="inherit">
                  Backup
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  History
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Roll
                </Link>
              </Box>
            </Box>
          </Box>
          <Box textAlign="center" >
            Nous, les Créateurs Absolus &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  );
}