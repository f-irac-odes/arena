import { World, type Entity } from '@medieval/sword'; // Assuming your World and Entity are defined in world.ts

/**
 * An interface representing an encoded snapshot of the ECS world.
 */
export interface Snapshot {
	version: number;
	timestamp: number;
	state: string; // Encoded state (e.g., JSON, compressed data)
}

/**
 * A class to manage snapshotting, encoding, and decoding of the ECS world state.
 */
export class Arena<T extends Entity> {
	private world: World<T>;
	private version: number;

	constructor(world: World<T>, initialVersion: number = 1) {
		this.world = world;
		this.version = initialVersion;
	}

	/**
	 * Takes a snapshot of the current world state.
	 * @param fullSnapshot Whether to take a full snapshot or just encode the differences.
	 * @returns A Snapshot object containing the encoded world state and a timestamp.
	 */
	snapshot(fullSnapshot: boolean = true): Snapshot {
		const state = this.encode(fullSnapshot);
		return {
			version: this.version,
			timestamp: Date.now(),
			state
		};
	}

	/**
	 * Restores the world state from a given snapshot.
	 * @param snapshot The snapshot to restore the world from.
	 * @throws Error if the snapshot version is incompatible.
	 */
	restore(snapshot: Snapshot) {
		if (snapshot.version !== this.version) {
			throw new Error(
				`Snapshot version ${snapshot.version} is incompatible with current version ${this.version}.`
			);
		}
		this.decode(snapshot.state);
	}

	/**
	 * Encodes the current world state into a string.
	 * @param fullSnapshot Whether to encode the full state or just the differences.
	 * @returns The encoded state as a string.
	 */
	private encode(fullSnapshot: boolean): string {
		const state = fullSnapshot ? this.world.toJSON() : this.encodeDifferences();
		return JSON.stringify(state); // Replace with a more complex encoding/compression if needed
	}

	/**
	 * Decodes the world state from an encoded string.
	 * @param encodedState The encoded state as a string.
	 */
	private decode(encodedState: string) {
		const state = JSON.parse(encodedState);
		this.world.fromJSON(state);
	}

	/**
	 * Encodes only the differences between the current state and the previous state.
	 * @returns The encoded differences as a string.
	 */
	private encodeDifferences(): string {
		// Implement differential encoding logic here
		// For simplicity, let's assume this method returns the full state
		return this.world.toJSON();
	}

	/**
	 * Gets the current world instance.
	 * @returns The current world object.
	 */
	getWorld(): World<T> {
		return this.world;
	}

	/**
	 * Upgrades the ECS version, useful for handling versioned snapshots.
	 * @param newVersion The new version to upgrade to.
	 */
	upgradeVersion(newVersion: number) {
		this.version = newVersion;
	}
}
