import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalHeroSearch from "../../components/modal-hero-search";
import useHero from "../../hooks/use-hero";
import { useAppSelector } from "../../hooks/use-redux";
import * as HomeStyles from "../home/styles";
import HerosAddedInList from "./components/heros-added-in-list";
import * as S from "./styles";
import { createHeroGroup } from "./utils";

const CreateHeroGroup: React.FC = () => {
  const {
    loadingHerosSearched,
    herosFound,
    search,
    setSearch,
    debouncedSearchValue,
    handleAddHeroInList,
  } = useHero();
  const [groupName, setGroupName] = useState("");

  const navigate = useNavigate();
  const { heros } = useAppSelector((state) => state.heros);

  const handleCreateHeroGroup = () => {
    const response = createHeroGroup({ groupName, heros });

    if (response === "success") {
      navigate("/hero-group/list");
    }
  };

  return (
    <S.Wrapper>
      <S.SearchHeroInput
        placeholder="search for some hero to add ..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {debouncedSearchValue ? (
        <ModalHeroSearch
          heros={herosFound}
          isLoading={loadingHerosSearched}
          type="search"
          getHeroInfo={handleAddHeroInList}
        />
      ) : null}

      {heros.length ? (
        <>
          <S.CreateHeroGroupWrapper>
            <S.SearchHeroInput
              placeholder="type here the hero group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <HomeStyles.CreateHeroGroupButton onClick={handleCreateHeroGroup}>
              Create
            </HomeStyles.CreateHeroGroupButton>
          </S.CreateHeroGroupWrapper>

          <HerosAddedInList />
        </>
      ) : null}
    </S.Wrapper>
  );
};

export default CreateHeroGroup;
