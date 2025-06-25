import Container from "./container";

export default function Footer() {
  return (
    <footer className="bg-blue-400 pb-8 py-14 border-t border-blue-200/20">
      <Container>
        <div className="flex justify-between text-grey-400">
          <div className="flex gap-4">
            <span>Terms of Use</span>
            <span>Privacy Policy</span>
          </div>
          <div className="">
            © {new Date().getFullYear()} Clin Technologies. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
}
