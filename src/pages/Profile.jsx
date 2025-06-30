import { useSanity } from '../hooks/useSanity';
import { FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon
import styles from './Profile.module.css';

export default function Profile() {
  const { data: personalInfo, loading, error } = useSanity(
    `*[_type == "personalInfo"][0]{
      name,
      title, // Fetch the title
      profileImage{asset->{url}},
      phone,
      email,
      address,
      skills,
      aboutMe
    }`
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.profileContainer}>
      {/* Profile Header Section */}
      <div className={styles.profileHeader}>
        <div className={styles.profileImageWrapper}>
          <img 
            src={personalInfo?.profileImage?.asset?.url || 'https://placehold.co/400x400'} 
            alt={`Portrait of ${personalInfo?.name}`}
            className={styles.profileImage}
          />
        </div>
        <h1 className={styles.profileName}>{personalInfo?.name}</h1>
        <h2 className={styles.profileTitle}>{personalInfo?.title}</h2> {/* Display the title */}
      </div>

      {/* Contact Info Section */}
      <div className={styles.contactInfo}>
        <div className={styles.contactItem}>
          <FaWhatsapp /> {/* Use WhatsApp icon */}
          <span>{personalInfo?.phone}</span>
        </div>
        <div className={styles.contactItem}>
          <span>✉️</span>
          <a href={`mailto:${personalInfo?.email}`}>{personalInfo?.email}</a>
        </div>
        <div className={styles.contactItem}>
          <span>🏠</span>
          <span>{personalInfo?.address}</span>
        </div>
      </div>

      {/* About Me Section */}
      <div className={styles.aboutSection}>
        <h2 className={styles.sectionTitle}>About Me</h2>
        <p>{personalInfo?.aboutMe?.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}</p>
      </div>

      {/* Skills Section */}
      <div className={styles.skillsSection}>
        <h2 className={styles.sectionTitle}>My Skills</h2>
        <div className={styles.skillsContainer}>
          {personalInfo?.skills?.map((skill) => (
            <div key={skill} className={styles.skillPill}>
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
