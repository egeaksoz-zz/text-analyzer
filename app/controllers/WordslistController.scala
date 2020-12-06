package controllers

import models.WordslistRepository

import javax.inject.Inject
import play.api.libs.json.{JsValue, Json}
import play.api.mvc._
import utils.kafka.KafkaService

import scala.concurrent.ExecutionContext

class WordslistController @Inject()(wordslistRepo: WordslistRepository, cc: MessagesControllerComponents)(implicit ec: ExecutionContext) extends MessagesAbstractController(cc) with KafkaService{

  def errorJson(message: String) = Json.obj("error" -> message)

  def analyze = Action(parse.json) { request: Request[JsValue] =>
    val text = (request.body \ "text").as[String]
    writeToKafka(text)
    Ok("Text sent for analysis...")
    }

  def results = Action.async { implicit  request =>
    wordslistRepo.list().map{ wordsAndCounts =>
      Ok(Json.toJson(wordsAndCounts))
    }
  }
}
