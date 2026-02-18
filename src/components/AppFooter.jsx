// src/components/AppFooter.jsx
// Footer for SmartStore

import Container from 'react-bootstrap/Container';

export default function AppFooter() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-top mt-auto py-3 bg-light">
            <Container className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
                <div className="text-muted small">
                    © {year} SmartStore. All rights reserved.
                </div>
                <div className="text-muted small">
                    Component-Based Programming course project
                </div>
            </Container>
        </footer>
    );
}
