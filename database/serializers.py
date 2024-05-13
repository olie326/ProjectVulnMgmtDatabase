from rest_framework import serializers
from dj_rest_auth.serializers import UserDetailsSerializer

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


class CustomUserDetailsSerializer(UserDetailsSerializer):
    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('email',)

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.save()
        return instance
