import { SubSite } from 'src/domain/entities/subsite.entity';
import { ISubSiteRepository } from 'src/domain/repositories/subsite.repository';
import { SubSiteDTO } from 'src/presentation/dtos/subsite.dto';

/**
 * Service for managing SubSites.
 * Implements business logic for operations related to SubSites using the repository interface.
 */
export class SubSiteService {
  constructor(private readonly subSiteRepository: ISubSiteRepository) {}

  /**
   * Creates a new subsite.
   * @param subSiteDTO - Data Transfer Object containing details of the subsite to create.
   * @returns The created SubSite entity.
   */
  async createSubSite(subSiteDTO: SubSiteDTO): Promise<SubSite> {
    // Map DTO to domain entity
    const subSite = new SubSite(
      subSiteDTO.id,
      subSiteDTO.title,
      subSiteDTO.userId,
      null,
      subSiteDTO.config,
      subSiteDTO.createdAt,
    );

    // Call repository to create the subsite
    return this.subSiteRepository.create(subSite);
  }

  /**
   * Fetches a subsite by its ID.
   * @param id - Unique identifier of the subsite.
   * @returns The SubSite entity if found, otherwise null.
   */
  async getSubSiteById(id: number): Promise<SubSite | null> {
    return this.subSiteRepository.getById(id);
  }

  /**
   * Updates a subsite's details.
   * @param id - Unique identifier of the subsite to update.
   * @param updates - Partial fields to update for the subsite.
   * @returns The updated SubSite entity.
   */
  async updateSubSite(
    id: number,
    updates: Partial<SubSiteDTO>,
  ): Promise<SubSite> {
    // Ensure the provided updates conform to the domain entity
    const subSiteUpdates = new SubSite(
      id,
      updates.title ?? '',
      updates.userId ?? 0,
      null,
      updates.config ?? {},
      new Date(),
    );

    return this.subSiteRepository.update(id, subSiteUpdates);
  }

  /**
   * Removes a subsite by its ID.
   * @param id - Unique identifier of the subsite to remove.
   * @returns A boolean indicating the success of the removal.
   */
  async removeSubSite(id: number): Promise<boolean> {
    return this.subSiteRepository.remove(id);
  }

  /**
   * Lists all subsites associated with a specific user.
   * @param userId - Unique identifier of the user.
   * @returns Array of SubSites associated with the user.
   */
  async getSubSitesByUser(userId: number): Promise<SubSite[]> {
    return this.subSiteRepository.getByUser(userId);
  }

  /**
   * Validates a subsite's attributes such as title and configuration.
   * @param subSiteDTO - Data Transfer Object representing the subsite to validate.
   * @returns A boolean indicating if the SubSite is valid.
   */
  async validateSubSite(subSiteDTO: SubSiteDTO): Promise<boolean> {
    // Implement validation logic if needed
    return this.subSiteRepository.validate(
      new SubSite(
        subSiteDTO.id,
        subSiteDTO.title,
        subSiteDTO.userId,
        null,
        subSiteDTO.config,
        subSiteDTO.createdAt,
      ),
    );
  }

  /**
   * Retrieves the configuration of a subsite.
   * @param id - Unique identifier of the subsite.
   * @returns The JSON configuration of the subsite.
   */
  async getSubSiteConfig(id: number): Promise<any> {
    return this.subSiteRepository.getConfig(id);
  }

  /**
   * Updates a subsite's configuration.
   * @param id - Unique identifier of the subsite.
   * @param config - New configuration to apply to the subsite.
   * @returns The updated SubSite entity with new configuration.
   */
  async updateSubSiteConfig(id: number, config: any): Promise<SubSite> {
    return this.subSiteRepository.updateConfig(id, config);
  }

  /**
   * Finds the most recently created subsite.
   * @returns The latest SubSite entity.
   */
  async getLatestSubSite(): Promise<SubSite> {
    return this.subSiteRepository.getLatest();
  }

  /**
   * Lists all active subsites.
   * @returns An array of currently active SubSite entities.
   */
  async getActiveSubSites(): Promise<SubSite[]> {
    return this.subSiteRepository.getActive();
  }

  /**
   * Counts the number of subsites for a specific user.
   * @param userId - Unique identifier of the user.
   * @returns The total number of subsites for the user.
   */
  async countSubSitesByUser(userId: number): Promise<number> {
    return this.subSiteRepository.countByUser(userId);
  }
}
