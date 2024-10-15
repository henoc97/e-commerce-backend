import { Subsite } from '../entities/Subsite.entity';

/**
 * Interface for handling business rules and CRUD operations related to Subsites.
 */
export interface ISubsiteRepository {
  /**
   * Creates a new Subsite.
   * @param Subsite - The Subsite entity to be created.
   * @returns The created Subsite entity.
   */
  create(Subsite: Subsite): Promise<Subsite>;

  /**
   * Fetches a Subsite by its ID.
   * @param id - Unique identifier of the Subsite.
   * @returns The Subsite if found, otherwise null.
   */
  getById(id: number): Promise<Subsite | null>;

  /**
   * Updates a Subsite's details.
   * @param id - Unique identifier of the Subsite.
   * @param updates - Fields to update for the Subsite.
   * @returns The updated Subsite entity.
   */
  update(id: number, updates: Partial<Subsite>): Promise<Subsite>;

  /**
   * Removes a Subsite by its ID.
   * @param id - Unique identifier of the Subsite.
   * @returns A boolean indicating if the deletion was successful.
   */
  remove(id: number): Promise<boolean>;

  /**
   * Lists all Subsites associated with a specific user.
   * @param userId - Unique identifier of the user.
   * @returns Array of Subsites associated with the user.
   */
  getByUser(userId: number): Promise<Subsite[]>;

  /**
   * Validates the Subsite's attributes such as title and configuration.
   * @param Subsite - The Subsite entity to be validated.
   * @returns A boolean indicating if the Subsite is valid.
   */
  validate(Subsite: Subsite): Promise<boolean>;

  /**
   * Retrieves the configuration of a Subsite.
   * @param id - Unique identifier of the Subsite.
   * @returns The Subsite's configuration in JSON format.
   */
  getConfig(id: number): Promise<any>;

  /**
   * Updates a Subsite's configuration.
   * @param id - Unique identifier of the Subsite.
   * @param config - New configuration to be applied to the Subsite.
   * @returns The updated Subsite entity.
   */
  updateConfig(id: number, config: any): Promise<Subsite>;

  /**
   * Finds the most recently created Subsite.
   * @returns The latest Subsite entity.
   */
  getLatest(): Promise<Subsite>;

  /**
   * Counts the number of Subsites for a specific user.
   * @param userId - Unique identifier of the user.
   * @returns The total number of Subsites for the user.
   */
  countByUser(userId: number): Promise<number>;
}
