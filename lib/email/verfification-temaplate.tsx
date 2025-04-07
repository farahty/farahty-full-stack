interface EmailTemplateProps {
  name: string;
  url: string;
}

export const VerificationTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  url,
}) => (
  <div>
    <h1>Welcome, {name}!</h1>
    <p>
      Thank you for signing up. Please verify your email address by clicking the
      link below:
    </p>
    <a href={url} style={{ color: "#1E90FF", textDecoration: "underline" }}>
      Verify Email
    </a>
  </div>
);
