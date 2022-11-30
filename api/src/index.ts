import { Publisher } from "./services/Publisher";

async function run() {
    const publisher = new Publisher();
    await publisher.init()
    const ids = ["63619ee6546b4cfab2945b93", "63627abc16a80a5bd6559b13", "63850cb2376b2fd3e70c2f77"];
    ids.forEach(id => publisher.sendMessage(id));
}

run();


