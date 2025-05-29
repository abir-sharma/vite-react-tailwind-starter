import React from 'react';

interface VideoCardProps {
  thumbnail: string;
  title: string;
  description: string;
  rating: number; // 1 to 5
}

const VideoCard: React.FC<VideoCardProps> = ({ thumbnail, title, description, rating }) => {
  return (
    <div style={styles.card}>
      <img src={thumbnail} alt={title} style={styles.thumbnail} />
      
      <div style={styles.content}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.description}>{description}</p>
        <div style={styles.rating}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} style={{ color: i < rating ? '#FFD700' : '#ccc' }}>★</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    display: 'flex',
    border: '1px solid #ddd',
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    margin: 12,
    maxWidth: 600,
  },
  thumbnail: {
    width: 200,
    height: 'auto',
    objectFit: 'cover',
  },
  content: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: '#555',
    marginBottom: 10,
  },
  rating: {
    fontSize: 18,
  },
};

export default VideoCard;
