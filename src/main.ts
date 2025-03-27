type NationalityListActress =
  | "American"
  | "British"
  | "Australian"
  | "Israeli-American"
  | "South African"
  | "French"
  | "Indian"
  | "Israeli"
  | "Spanish"
  | "South Korean"
  | "Chinese";

type NationalityListActor =
  | NationalityListActress
  | "Scottish"
  | "New Zealand"
  | "Hong Kong"
  | "German"
  | "Canadian"
  | "Irish";

type Person = {
  readonly id: number;
  readonly name: string;
  birth_year: number;
  death_year?: number;
  biography: string;
  image: string;
};

/* ACTRESS */
type Actress = Person & {
  most_famous_movies: [string, string, string];
  awards: string;
  nationality: NationalityListActress;
};

/* ACTOR */
type Actor = Person & {
  known_for: [string, string, string];
  awards: [string, string?];
  nationality: NationalityListActor;
};

/* ACTRESSES */
function isActress(data: unknown): data is Actress {
  if (
    data &&
    typeof data === "object" &&
    "id" in data &&
    typeof data.id === "number" &&
    "name" in data &&
    typeof data.name === "string" &&
    "birth_year" in data &&
    typeof data.birth_year === "number" &&
    "biography" in data &&
    typeof data.biography === "string" &&
    "image" in data &&
    typeof data.image === "string" &&
    "most_famous_movies" in data &&
    Array.isArray(data.most_famous_movies) &&
    "awards" in data &&
    typeof data.awards === "string" &&
    "nationality" in data &&
    typeof data.nationality === "string" &&
    [
      "American",
      "British",
      "Australian",
      "Israeli-American",
      "South African",
      "French",
      "Indian",
      "Israeli",
      "Spanish",
      "South Korean",
      "Chinese",
    ].includes(data.nationality)
  ) {
    return true;
  }
  return false;
}

async function getActress<T>(id: number): Promise<T | null> {
  try {
    const res = await fetch(
      `https://boolean-spec-frontend.vercel.app/freetestapi/actresses/${id}`
    );

    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}`);
    }

    const data = await res.json();
    if (isActress(data)) {
      return data as T;
    } else throw new Error("I dati non sono validi");
  } catch (error) {
    return null;
  }
}

async function getActresses(nums: number[]): Promise<Actress[] | null> {
  let promises: Promise<Actress | null>[] = [];
  nums.forEach((n) => {
    promises.push(getActress(n));
  });
  const resData = await Promise.all(promises);

  const data = resData.filter((d) => d !== null);
  return data;
}

async function getAllActresses(): Promise<Actress[] | null> {
  try {
    const res = await fetch(
      `https://boolean-spec-frontend.vercel.app/freetestapi/actresses/`
    );

    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}`);
    }

    const data = await res.json();

    data.forEach((d: unknown) => {
      if (isActress(d)) {
        return;
      } else {
        throw new Error("I dati non sono validi");
      }
    });

    return data;
  } catch (error) {
    return null;
  }
}

function createActress(data: Omit<Actress, "id">): Actress {
  return {
    id: 10,
    ...data,
  };
}

function updateActress(actress: Actress, update: Partial<Actress>): Actress {
  return { ...actress, ...update };
}

getActress<Actress>(1)
  .then((data) => console.log("Single Actress: ", data))
  .catch((error) => console.error(error));

getActresses([1, 2, 3, 4])
  .then((data) => console.log("Multiple Actresses: ", data))
  .catch((error) => console.error(error));

getAllActresses()
  .then((data) => console.log("All Actresses: ", data))
  .catch((error) => console.error(error));

/* ACTORS */
function isActor(data: unknown): data is Actor {
  if (
    data &&
    typeof data === "object" &&
    "id" in data &&
    typeof data.id === "number" &&
    "name" in data &&
    typeof data.name === "string" &&
    "birth_year" in data &&
    typeof data.birth_year === "number" &&
    "biography" in data &&
    typeof data.biography === "string" &&
    "image" in data &&
    typeof data.image === "string" &&
    "known_for" in data &&
    Array.isArray(data.known_for) &&
    "awards" in data &&
    Array.isArray(data.awards) &&
    "nationality" in data &&
    typeof data.nationality === "string" &&
    [
      "American",
      "British",
      "Australian",
      "Israeli-American",
      "South African",
      "French",
      "Indian",
      "Israeli",
      "Spanish",
      "South Korean",
      "Chinese",
      "Scottish",
      "New Zealand",
      "Hong Kong",
      "German",
      "Canadian",
      "Irish",
    ].includes(data.nationality)
  ) {
    return true;
  }
  return false;
}

async function getActor<T>(id: number): Promise<T | null> {
  try {
    const res = await fetch(
      `https://boolean-spec-frontend.vercel.app/freetestapi/actors/${id}`
    );

    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}`);
    }

    const data = await res.json();
    if (isActor(data)) {
      return data as T;
    } else throw new Error("I dati non sono validi");
  } catch (error) {
    return null;
  }
}

async function getActors(nums: number[]): Promise<Actor[] | null> {
  let promises: Promise<Actor | null>[] = [];
  nums.forEach((n) => {
    promises.push(getActor(n));
  });
  const resData = await Promise.all(promises);

  const data = resData.filter((d) => d !== null);
  return data;
}

async function getAllActors(): Promise<Actor[] | null> {
  try {
    const res = await fetch(
      `https://boolean-spec-frontend.vercel.app/freetestapi/actors/`
    );

    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}`);
    }

    const data = await res.json();

    data.forEach((d: unknown) => {
      if (isActor(d)) {
        return;
      } else {
        throw new Error("I dati non sono validi");
      }
    });

    return data;
  } catch (error) {
    return null;
  }
}

function createActor(data: Omit<Actor, "id">): Actor {
  return {
    id: 10,
    ...data,
  };
}

function updateActor(actor: Actor, update: Partial<Actor>): Actor {
  return { ...actor, ...update };
}

getActor<Actor>(1)
  .then((data) => console.log("Single Actor: ", data))
  .catch((error) => console.error(error));

getActors([1, 2, 3, 4])
  .then((data) => console.log("Multiple Actors: ", data))
  .catch((error) => console.error(error));

getAllActors()
  .then((data) => console.log("All Actors: ", data))
  .catch((error) => console.error(error));

/* createRandomCouple */
async function createRandomCouple(): Promise<[Actress, Actor]> {
  const actresses = await getAllActresses();
  const actors = await getAllActors();

  if (!actresses || actresses.length === 0) {
    throw new Error("Nessuna attrice disponibile.");
  }

  if (!actors || actors.length === 0) {
    throw new Error("Nessun attore disponibile.");
  }

  const randomActresses =
    actresses[Math.floor(Math.random() * actresses.length)];
  const randomActors = actors[Math.floor(Math.random() * actors.length)];

  return [randomActresses, randomActors];
}

createRandomCouple()
  .then((data) => console.log("Attore:", data[0], "Attrice:", data[1]))
  .catch((error) => console.error(error));
