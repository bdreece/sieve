# sieve - Sifting through the news with NLP models
# Copyright (C) 2022 Brian Reece
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.

from transformers import AutoModelForSequenceClassification, AutoTokenizer, pipeline


def get_analyzer(mode):
    if mode == "development":
        path = "./models/analyzer"
        model = AutoModelForSequenceClassification.from_pretrained(path)
        tokenizer = AutoTokenizer.from_pretrained(path)
        return pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)
    else:
        return None
