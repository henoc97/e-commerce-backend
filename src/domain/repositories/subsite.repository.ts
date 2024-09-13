import { SubSite } from "../entities/subsite.entity";

/**
 * Interface for handling business rules and CRUD operations related to subsites.
 */
export interface ISubSiteRepository {
  
  /**
   * Creates a new subsite.
   * @param subSite - The SubSite entity to be created.
   * @returns The created SubSite entity.
   */
  create(subSite: SubSite): Promise<SubSite>;

  /**
   * Fetches a subsite by its ID.
   * @param id - Unique identifier of the subsite.
   * @returns The SubSite if found, otherwise null.
   */
  getById(id: number): Promise<SubSite | null>;

  /**
   * Updates a subsite's details.
   * @param id - Unique identifier of the subsite.
   * @param updates - Fields to update for the subsite.
   * @returns The updated SubSite entity.
   */
  update(id: number, updates: Partial<SubSite>): Promise<SubSite>;

  /**
   * Removes a subsite by its ID.
   * @param id - Unique identifier of the subsite.
   * @returns A boolean indicating if the deletion was successful.
   */
  remove(id: number): Promise<boolean>;

  /**
   * Lists all subsites associated with a specific user.
   * @param userId - Unique identifier of the user.
   * @returns Array of SubSites associated with the user.
   */
  getByUser(userId: number): Promise<SubSite[]>;

  /**
   * Validates the subsite's attributes such as title and configuration.
   * @param subSite - The SubSite entity to be validated.
   * @returns A boolean indicating if the SubSite is valid.
   */
  validate(subSite: SubSite): Promise<boolean>;

  /**
   * Retrieves the configuration of a subsite.
   * @param id - Unique identifier of the subsite.
   * @returns The subsite's configuration in JSON format.
   */
  getConfig(id: number): Promise<any>;

  /**
   * Updates a subsite's configuration.
   * @param id - Unique identifier of the subsite.
   * @param config - New configuration to be applied to the subsite.
   * @returns The updated SubSite entity.
   */
  updateConfig(id: number, config: any): Promise<SubSite>;

  /**
   * Finds the most recently created subsite.
   * @returns The latest SubSite entity.
   */
  getLatest(): Promise<SubSite>;

  /**
   * Lists all active subsites.
   * @returns An array of currently active SubSite entities.
   */
  getActive(): Promise<SubSite[]>;

  /**
   * Counts the number of subsites for a specific user.
   * @param userId - Unique identifier of the user.
   * @returns The total number of subsites for the user.
   */
  countByUser(userId: number): Promise<number>;
}
