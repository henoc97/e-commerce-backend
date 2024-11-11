import { PrismaService } from 'prisma/prisma.service';
import { fromSubsitePrisma } from 'src/application/helper/from-prisma/to.sub-site.entity';
import { Subsite } from 'src/domain/entities/subsite.entity';
import { ISubsiteRepository } from 'src/domain/repositories/subsite.repository';

export class SubsiteRepository implements ISubsiteRepository {
  constructor(private readonly prisma: PrismaService) { }
  /**
   * Creates a new Subsite.
   * @param subsite - The subsite entity to create.
   * @returns The created subsite.
   */
  async create(subsite: Subsite): Promise<Subsite> {
    try {
      const { id, user, ...data } = subsite;
      const createdSubsite = await this.prisma.subsite.create({
        data: data,
      });
      return fromSubsitePrisma(createdSubsite);
    } catch (error) {
      console.error('Error creating subsite:', error);
      throw new Error('Failed to create subsite');
    }
  }

  /**
   * Retrieves a Subsite by its ID.
   * @param id - The ID of the subsite.
   * @returns The subsite if found, or null if not found.
   */
  async getById(id: number): Promise<Subsite | null> {
    try {
      const subsite = await this.prisma.subsite.findUnique({
        where: { id },
      });
      return fromSubsitePrisma(subsite);
    } catch (error) {
      console.error('Error retrieving subsite by ID:', error);
      throw new Error('Failed to retrieve subsite');
    }
  }

  /**
   * Updates a Subsite by its ID.
   * @param id - The ID of the subsite.
   * @param updates - Partial updates to the subsite.
   * @returns The updated subsite.
   */
  async update(id: number, updates: Partial<Subsite>): Promise<Subsite> {
    try {
      const { id, user, ...data } = updates;
      const updatedSubsite = await this.prisma.subsite.update({
        where: { id },
        data: data,
      });
      return fromSubsitePrisma(updatedSubsite);
    } catch (error) {
      console.error('Error updating subsite:', error);
      throw new Error('Failed to update subsite');
    }
  }

  /**
   * Deletes a Subsite by its ID.
   * @param id - The ID of the subsite.
   * @returns True if deletion was successful, otherwise false.
   */
  async remove(id: number): Promise<boolean> {
    try {
      await this.prisma.subsite.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error('Error deleting subsite:', error);
      return false;
    }
  }

  /**
   * Retrieves all Subsites associated with a specific user.
   * @param userId - The ID of the user.
   * @returns An array of Subsites owned by the user.
   */
  async getByUser(userId: number): Promise<Subsite[]> {
    try {
      const subsites = await this.prisma.subsite.findMany({
        where: { userId },
      });
      return subsites.map(fromSubsitePrisma);
    } catch (error) {
      console.error('Error retrieving subsites by user:', error);
      throw new Error('Failed to retrieve subsites for user');
    }
  }

  /**
   * Validates a Subsite entity.
   * @param subsite - The subsite to validate.
   * @returns True if valid, otherwise false.
   */
  async validate(subsite: Subsite): Promise<boolean> {
    try {
      // Add validation logic if needed
      return true;
    } catch (error) {
      console.error('Error validating subsite:', error);
      throw new Error('Failed to validate subsite');
    }
  }

  /**
   * Retrieves the configuration of a Subsite by its ID.
   * @param id - The ID of the subsite.
   * @returns The subsite's configuration.
   */
  async getConfig(id: number): Promise<any> {
    try {
      const subsite = await this.prisma.subsite.findUnique({
        where: { id },
        select: { config: true },
      });
      return subsite?.config;
    } catch (error) {
      console.error('Error retrieving subsite config:', error);
      throw new Error('Failed to retrieve subsite config');
    }
  }

  /**
   * Updates the configuration of a Subsite.
   * @param id - The ID of the subsite.
   * @param config - The new configuration data.
   * @returns The updated subsite with new configuration.
   */
  async updateConfig(id: number, config: any): Promise<Subsite> {
    try {
      const updatedSubsite = await this.prisma.subsite.update({
        where: { id },
        data: { config },
      });
      return fromSubsitePrisma(updatedSubsite);
    } catch (error) {
      console.error('Error updating subsite config:', error);
      throw new Error('Failed to update subsite config');
    }
  }

  /**
   * Retrieves the most recently created Subsite.
   * @returns The most recent Subsite.
   */
  async getLatest(): Promise<Subsite> {
    try {
      const latestSubsite = await this.prisma.subsite.findFirst({
        orderBy: { createdAt: 'desc' },
      });
      return fromSubsitePrisma(latestSubsite);
    } catch (error) {
      console.error('Error retrieving latest subsite:', error);
      throw new Error('Failed to retrieve latest subsite');
    }
  }

  /**
   * Counts the number of Subsites associated with a specific user.
   * @param userId - The ID of the user.
   * @returns The number of Subsites owned by the user.
   */
  async countByUser(userId: number): Promise<number> {
    try {
      const count = await this.prisma.subsite.count({
        where: { userId },
      });
      return count;
    } catch (error) {
      console.error('Error counting subsites for user:', error);
      throw new Error('Failed to count subsites for user');
    }
  }
}
