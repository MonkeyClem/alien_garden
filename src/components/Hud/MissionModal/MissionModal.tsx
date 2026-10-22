import type { MissionModalProps } from "./MissionModal.interface";
import { missionConfig } from "../../../game/missions/mission.config";

export default function MissionModal({
  isMissionModalOpen,
  assets,
  missionsProgress,
  currentMissionId,
  // currentMissionObjectives,
  // currentMissionProgress,
  setIsMissionModalOpen,
}: MissionModalProps) {
  const currentMissionProgress = missionsProgress[currentMissionId];
  const currentMission = missionConfig[currentMissionId];

  // const [currentMissionProgress, setCurrentMissionProgress] = useState<MissionProgress>(
  //   missionsProgress[currentMissionId],
  // );

  // const [currentMission, setCurrentMission] = useState<Mission<MissionId>>(
  //   missionConfig[currentMissionId],
  // );

  // useEffect(() => {
  //   setCurrentMission(missionConfig["secondMission"]);
  // }, [currentMissionId]);

  // useEffect(() => {
  //   setCurrentMissionProgress(missionsProgress[currentMissionId]);
  // }, [currentMissionId]);

  console.log("currentMission :", currentMission.objectives);

  return isMissionModalOpen ? (
    <div
      style={{
        maxWidth: 450,
        fontSize: 14,
        borderRadius: 10,
        position: "absolute",
        padding: "0.5rem 1rem",
        right: 0,
        display: "flex",
        pointerEvents: "auto",
        flexDirection: "column",
        background: "rgba(7, 13, 31, 0.94)",
        border: "2px solid #087E9B",
        gap: "6px",
        textAlign: "left",
      }}
    >
      {" "}
      <div
        onClick={() => setIsMissionModalOpen(false)}
        style={{
          cursor: "pointer",
          height: 40,
          width: 40,
          backgroundImage: `url(${assets.close_mission_button.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute",
          right: -10,
          top: -10,
        }}
      ></div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            textTransform: "uppercase",
            fontWeight: 800,
            fontSize: 16,
            color: "#76cee4",
          }}
        >
          Mission :{" "}
        </p>
        <p
          style={{
            position: "relative",
            textTransform: "uppercase",
            fontWeight: 400,
            fontSize: 14,
            right: 25,
            color: "#4b9fb4",
          }}
        >
          Jour 1
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "0.5px solid #087E9B",
          borderBottom: "0.5px solid #087E9B",
        }}
      >
        <div>
          <p
            style={{
              color: "gold",
            }}
          >
            {currentMission.title}
          </p>
          <ul
            style={{
              padding: 0,
              listStyle: "none",
              textAlign: "left",
              paddingBottom: "0.5rem",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {currentMission.objectives.map(obj => (
              <li style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="checkbox"
                  checked={currentMissionProgress[obj.id] === true}
                />
                <p> {obj.description} </p>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ background: "black", width: "30%" }}>
          <img></img>
        </div>
      </div>
      <p style={{ fontWeight: 200, fontSize: 12 }}>
        Une première mission simple, qui vous permettra de comprendre les principes de
        base de cet écosystème.
      </p>
    </div>
  ) : (
    <div
      style={{
        fontSize: 14,
        width: 350,
        padding: "0.5rem ",
        borderRadius: 10,
        position: "absolute",
        display: "flex",
        right: 0,
        pointerEvents: "auto",
        flexDirection: "column",
        background: "rgba(7, 13, 31, 0.94)",
        border: "2px solid #087E9B",
        gap: 15,
        textAlign: "left",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            textTransform: "uppercase",
            fontWeight: 800,
            color: "#76cee4",
          }}
        >
          Mission :{" "}
        </p>
        <p
          style={{
            color: "gold",
            position: "absolute",
            right: "2rem",
          }}
        >
          Activer la Bio Battery{" "}
        </p>
        <div
          onClick={() => setIsMissionModalOpen(true)}
          style={{
            height: 40,
            width: 40,
            backgroundImage: `url(${assets.open_mission_button.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "absolute",
            right: -10,
            top: -10,
            cursor: "pointer",
          }}
        ></div>
      </div>
    </div>
  );
}
