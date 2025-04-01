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
  awards: [string] | [string, string];
  nationality: NationalityListActor;
};

function isPerson(data: unknown): data is Person {
  if (
    data &&
    typeof data === "object" &&
    data !== null &&
    "id" in data &&
    typeof data.id === "number" &&
    "name" in data &&
    typeof data.name === "string" &&
    "birth_year" in data &&
    typeof data.birth_year === "number" &&
    "biography" in data &&
    typeof data.biography === "string" &&
    "image" in data &&
    typeof data.image === "string"
  ) {
    return true;
  }
  return false;
}

/* ACTRESSES */
function isActress(data: unknown): data is Actress {
  if (
    isPerson(data) &&
    "most_famous_movies" in data &&
    Array.isArray(data.most_famous_movies) &&
    data.most_famous_movies.length === 3 &&
    data.most_famous_movies.every((m) => typeof m === "string") &&
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

    const data: unknown = await res.json();
    if (!isActress(data)) {
      throw new Error("I dati non sono validi");
    }
    return data as T;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Errore durante il recupero dell'attrice:", error);
    } else console.log("Errore sconosciuto:", error);
    return null;
  }
}

async function getActresses(nums: number[]): Promise<(Actress | null)[]> {
  try {
    let promises: Promise<Actress | null>[] = [];
    nums.forEach((n) => {
      promises.push(getActress(n));
    });
    const resData = await Promise.all(promises);

    return resData.filter((d) => d !== null);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Errore durante il recupero delle attrici:", error);
    } else console.log("Errore sconosciuto:", error);
    return [];
  }
}

async function getAllActresses(): Promise<Actress[] | null> {
  try {
    const res = await fetch(
      `https://boolean-spec-frontend.vercel.app/freetestapi/actresses/`
    );

    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}`);
    }

    const data: unknown = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("Formato dei dati non valido");
    }

    const dataValid = data.filter((d) => isActress(d));
    return dataValid;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Errore durante il recupero delle attrici:", error);
    } else console.log("Errore sconosciuto:", error);
    return [];
  }
}

function createActress(data: Omit<Actress, "id">): Actress {
  return {
    id: Math.floor(Math.random() * 100),
    ...data,
  };
}

function updateActress(
  actress: Actress,
  update: Partial<Omit<Actress, "id" | "name">>
): Actress {
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
    isPerson(data) &&
    "known_for" in data &&
    Array.isArray(data.known_for) &&
    data.known_for.length === 3 &&
    data.known_for.every((m) => typeof m === "string") &&
    "awards" in data &&
    Array.isArray(data.awards) &&
    (data.awards.length === 1 || data.awards.length === 2) &&
    data.awards.every((m) => typeof m === "string") &&
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

    const data: unknown = await res.json();
    if (!isActor(data)) {
      throw new Error("I dati non sono validi");
    }
    return data as T;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Errore durante il recupero dell'attore:", error);
    } else console.log("Errore sconosciuto:", error);
    return null;
  }
}

async function getActors(nums: number[]): Promise<(Actor | null)[]> {
  try {
    let promises: Promise<Actor | null>[] = [];
    nums.forEach((n) => {
      promises.push(getActor(n));
    });
    const resData = await Promise.all(promises);

    return resData.filter((d) => d !== null);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Errore durante il recupero degli attori:", error);
    } else console.log("Errore sconosciuto:", error);
    return [];
  }
}

async function getAllActors(): Promise<Actor[] | null> {
  try {
    const res = await fetch(
      `https://boolean-spec-frontend.vercel.app/freetestapi/actors/`
    );

    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}`);
    }

    const data: unknown = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("Formato dei dati non valido");
    }

    const dataValid = data.filter((d) => isActor(d));
    return dataValid;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Errore durante il recupero degli attori:", error);
    } else console.log("Errore sconosciuto:", error);
    return [];
  }
}

function createActor(data: Omit<Actor, "id">): Actor {
  return {
    id: Math.floor(Math.random() * 100),
    ...data,
  };
}

function updateActor(
  actor: Actor,
  update: Partial<Omit<Actor, "id" | "name">>
): Actor {
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
  const [actresses, actors] = await Promise.all([
    getAllActresses(),
    getAllActors(),
  ]);

  if (!actresses || actresses.length === 0) {
    throw new Error("Nessuna attrice disponibile.");
  }

  if (!actors || actors.length === 0) {
    throw new Error("Nessun attore disponibile.");
  }

  const randomActress = actresses[Math.floor(Math.random() * actresses.length)];
  const randomActor = actors[Math.floor(Math.random() * actors.length)];

  return [randomActress, randomActor];
}

createRandomCouple()
  .then((data) =>
    console.log(`Attore: ${data[0].name},
Attrice: ${data[1].name}`)
  )
  .catch((error) => console.error(error));
