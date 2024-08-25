import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { Ebook } from '../ebooks/entities/ebook.entity';

@Injectable()
export class SearchService {
  private readonly esClient: Client;

  constructor() {
    this.esClient = new Client({
      node: 'https://es.ext.akademy.dev',
    });
    console.log('esClient', this.esClient);
  }

  async indexEbook(ebook: Ebook) {
    await this.esClient.index({
      index: 'wordwonder_ebooks',
      id: ebook.id,
      document: {
        id: ebook.id,
        name: ebook.name,
        author: ebook.author,
        description: ebook.description,
        translator: ebook.translator,
        categories: ebook.categories.map((category) => category.name),
      },
    });
  }

  async searchEbooks(query: string) {
    // search for profiles by username or email or uid
    const response = await this.esClient.search({
      index: 'wordwonder_ebooks',
      query: {
        multi_match: {
          query: query,
          fields: ['id', 'name', 'author', 'description'],
        },
      },
    });
    return response.hits.hits;
  }

  async updateEbook(ebook: Ebook) {
    // delete first
    await this.deleteEbook(ebook.id);
    // index
    await this.indexEbook(ebook);
  }

  async deleteEbook(ebookId: string) {
    await this.esClient.delete({
      index: 'wordwonder_ebooks',
      id: ebookId,
    });
  }

  async searchAny(indexName: string, query: string) {
    try {
      const response = await this.esClient.search({
        index: [indexName],
        query: {
          multi_match: {
            query: query,
            fields: ['*'],
          },
        },
      });
      return response.hits.hits.map((hit) => hit['_source']);
    } catch (e) {
      return [];
    }
  }
}
