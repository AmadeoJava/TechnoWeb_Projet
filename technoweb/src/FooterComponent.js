import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import './FooterComponent.css';

export default function FooterComponent() {
  return (
    <footer id="footer" >
      <Box
        id="tout"
        bgcolor="text.secondary"
        color="white"
      >
        <Container maxWidth="lg">
          <Box id="groupe">
              <Box className="colonnes">
              <Box>
                <Link href="/ml" color="inherit" className="a">
                  Mentions Légales
                </Link>
              </Box>
            </Box>
            <Box className="colonnes">
              <Box>
                <Link href="/login" color="inherit" className="a">
                  Login
                </Link>
              </Box>
            </Box>
            <Box className="colonnes">
              <Box>
                <Link href="/" color="inherit" className="a">
                  Home
                </Link>
              </Box>
            </Box>
          </Box>
          <Box id="bas" textAlign="center" >
            Albivouac &copy; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  );
}