import styles from "./User.module.scss";
import Avatar from "../avatar/Avatar";

export default function User({ name = "", info = "", avatar = "", size = 55, verified = false }) {
  return (
    <div className={styles.user}>
      <Avatar url={avatar} size={size} verified={verified} />
      <div className={styles.container}>
        <div className={styles["user-name"]}>{name}</div>
        <div className={styles["user-info"]}>{info}</div>
      </div>
    </div>
  );
}
