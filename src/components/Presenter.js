import { useEffect, useState, useCallback } from "react";
import Entity from "./Entity";
import { getEntities } from "../api/api";
import LoadingSpinner from "./UI/LoadingSpinner";
import styles from "./Presenter.module.css";
import worldMap from "../assets/world.png";

export default function Presenter(props) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState("");

  const mapEntities = async () => {
    setLoading(<LoadingSpinner />);
    const entities = await getEntities();
    setList(
      Object.keys(entities).map((entity) =>
        Object.assign({ key: entity }, entities[entity])
      )
    );
    setLoading("");
  };

  const getData = useCallback(() => {
    mapEntities();
  }, []);

  const mapped =
    list.length > 0 &&
    list.map((l) => <Entity entity={l} key={l.key} onReload={mapEntities} />);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className={styles.worldMap}>
      {loading}
      {mapped}
      <img alt="World Map" src={worldMap} />
    </div>
  );
}
