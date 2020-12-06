package models

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ Future, ExecutionContext }

/**
 * A repository for wordslist.
 *
 * @param dbConfigProvider The Play db config provider. Play will inject this for you.
 */
@Singleton
class WordslistRepository @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  // We want the JdbcProfile for this provider
  private val dbConfig = dbConfigProvider.get[JdbcProfile]

  // These imports are important, the first one brings db into scope, which will let you do the actual db operations.
  // The second one brings the Slick DSL into scope, which lets you define the table and other queries.
  import dbConfig._
  import profile.api._

  private class WordslistTable(tag: Tag) extends Table[Wordslist](tag, "wordslist") {

    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)

    def word = column[String]("word")

    def count  = column[Long]("count")

    def * = (id, word, count) <> ((Wordslist.apply _).tupled, Wordslist.unapply)
  }

  private val wordslist = TableQuery[WordslistTable]

  def list(): Future[Seq[Wordslist]] = db.run {
    wordslist.result
  }
}
