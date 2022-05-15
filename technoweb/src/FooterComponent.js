import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import './css/FooterComponent.css';

export default function FooterComponent() {
  return (
    <footer id="footer" >
      <Box
        id="tout"
        bgcolor="#aeb1b5"
        color="black"
      >
        <Container maxWidth="lg">
          <Box id="groupe">
              <Box className="colonnes">
              <Box>
                <Link href="/" color="inherit" className="a">
                  Home
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
                <Link href="/ml" color="inherit" className="a">
                Mentions Légales
                </Link>
              </Box>
            </Box>
          </Box>
          <Box id="bas" textAlign="center" >
            Albivouac &copy; 9 Mai 2022
          </Box>
        </Container>
      </Box>
    </footer>
  );
}