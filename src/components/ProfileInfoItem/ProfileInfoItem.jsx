import "./ProfileInfoItem.css";

function ProfileInfoItem({ icon, text }) {
  return (
    <div className="profile-info-item">
      <img src={icon} alt="" />
      <span>{text}</span>
    </div>
  );
}

export default ProfileInfoItem;