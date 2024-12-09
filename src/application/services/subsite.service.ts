import { Subsite } from '../../domain/entities/subsite.entity';
import { SubsiteDTO } from '../../presentation/dtos/subsite.dto';
import { fromSubsiteDTO } from '../helper/to-entity/to.sub-site.entity';
import { Inject } from '@nestjs/common';
import { ISubsiteRepository } from '../../domain/repositories/subsite.repository';

/**
 * Service for managing subsites.
 * Implements business logic for operations related to subsites using the repository interface.
 */
export class SubsiteService {
  constructor(
    @Inject('ISubsiteRepository')
    private readonly subsiteRepository: ISubsiteRepository,
  ) { }

  /**
   * Creates a new subsite.
   * @param subsiteDTO - Data Transfer Object containing details of the subsite to create.
   * @returns The created subsite entity.
   */
  async createSubsite(SubsiteDTO: SubsiteDTO): Promise<Subsite> {
    // Map DTO to domain entity
    const subsite = fromSubsiteDTO(SubsiteDTO);

    // Call repository to create the subsite
    return await this.subsiteRepository.create(subsite);
  }

  /**
   * Fetches a subsite by its ID.
   * @param id - Unique identifier of the subsite.
   * @returns The subsite entity if found, otherwise null.
   */
  async getSubsiteById(id: number): Promise<Subsite | null> {
    return await this.subsiteRepository.getById(id);
  }

  /**
   * Updates a subsite's details.
   * @param id - Unique identifier of the subsite to update.
   * @param updates - Partial fields to update for the subsite.
   * @returns The updated subsite entity.
   */
  async updateSubsite(
    id: number,
    updates: Partial<SubsiteDTO>,
  ): Promise<Subsite> {
    // Ensure the provided updates conform to the domain entity
    const subsiteUpdates = fromSubsiteDTO(updates);
    return await this.subsiteRepository.update(id, subsiteUpdates);
  }

  /**
   * Removes a subsite by its ID.
   * @param id - Unique identifier of the subsite to remove.
   * @returns A boolean indicating the success of the removal.
   */
  async removeSubsite(id: number): Promise<boolean> {
    return await this.subsiteRepository.remove(id);
  }

  /**
   * Lists all subsites associated with a specific user.
   * @param userId - Unique identifier of the user.
   * @returns Array of subsites associated with the user.
   */
  async getSubsitesByUser(userId: number): Promise<Subsite[]> {
    return await this.subsiteRepository.getByUser(userId);
  }

  /**
   * Validates a subsite's attributes such as title and configuration.
   * @param subsiteDTO - Data Transfer Object representing the subsite to validate.
   * @returns A boolean indicating if the subsite is valid.
   */
  async validateSubsite(SubsiteDTO: SubsiteDTO): Promise<boolean> {
    // Implement validation logic if needed
    const subsite = fromSubsiteDTO(SubsiteDTO);
    return await this.subsiteRepository.validate(subsite);
  }

  /**
   * Retrieves the configuration of a subsite.
   * @param id - Unique identifier of the subsite.
   * @returns The JSON configuration of the subsite.
   */
  async getSubsiteConfig(id: number): Promise<any> {
    return await this.subsiteRepository.getConfig(id);
  }

  /**
   * Updates a subsite's configuration.
   * @param id - Unique identifier of the subsite.
   * @param config - New configuration to apply to the subsite.
   * @returns The updated subsite entity with new configuration.
   */
  async updateSubsiteConfig(id: number, config: any): Promise<Subsite> {
    return await this.subsiteRepository.updateConfig(id, config);
  }

  /**
   * Finds the most recently created subsite.
   * @returns The latest subsite entity.
   */
  async getLatestSubsite(): Promise<Subsite> {
    return await this.subsiteRepository.getLatest();
  }

  /**
   * Lists all active subsites.
   * @returns An array of currently active subsite entities.
   */
  async getActiveSubsites(): Promise<Subsite[]> {
    // Implémentez la logique pour récupérer les sous-sites actifs
    return Promise.resolve([]); // Remplacez par la logique réelle
  }

  /**
   * Counts the number of subsites for a specific user.
   * @param userId - Unique identifier of the user.
   * @returns The total number of subsites for the user.
   */
  async countSubsitesByUser(userId: number): Promise<number> {
    return await this.subsiteRepository.countByUser(userId);
  }
}
