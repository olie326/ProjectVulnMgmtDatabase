from rest_framework import serializers

from database.models import Vulnerability, Asset, Definition

class VulnerabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vulnerability
        exclude = ['user']

class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        exclude = ['user']


class DefinitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Definition
        exclude = ['user']