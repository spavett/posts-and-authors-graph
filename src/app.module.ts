import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { AuthorsModule } from './authors/authors.module';
import { PostsModule } from './posts/posts.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { Image } from './posts/models/image.model';

@Module({
  imports: [
    AuthorsModule,
    PostsModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      path: '/postsandauthors',
      include: [AuthorsModule, PostsModule],
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
        path: 'src/schema.gql',
      },
      buildSchemaOptions: {
        orphanedTypes: [Image],
      },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
