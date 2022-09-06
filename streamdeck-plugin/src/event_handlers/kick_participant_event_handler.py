import logging
from event_handlers.base_event_handler import EventHandler

_logger = logging.getLogger("***KickParticipantEventHandler***")

class KickParticipantEventHandler(EventHandler):
    """
    A Stream Deck button that kicks a participant from the meeting.
    """

    STREAM_DECK_ACTION = "com.chrisregado.googlemeet.kickparticipant"

    async def _key_up_handler(self, event: dict) -> None:
        kickParticipant = self._make_sd_event_with_payload("kickParticipant", {"participantName": "Zach 2"})
        await self._browser_manager.send_to_clients(kickParticipant)
