export default function Footer() {
  return (
    <div style={styles.footerContainer}>
      <footer style={styles.footer}>
        <p style={styles.text}>© {new Date().getFullYear()} Abacus Website. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  footerContainer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  footer: {
    background: "#1a1a1a",
    color: "white",
    textAlign: "center",
    padding: "20px 0",
    width: "100%",
    boxSizing: "border-box",
    borderTop: "3px solid #d10000",
    
    '@media (max-width: 768px)': {
      padding: "15px 10px",
    }
  },
  text: {
    margin: 0,
    padding: 0,
    fontSize: "1rem",
    
    '@media (max-width: 768px)': {
      fontSize: "0.85rem",
    }
  }
};